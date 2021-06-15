import { Todo } from "interfaces/Todo";
import { useCallback, useEffect, useRef } from "react";
import useSWR from "swr";
import style from "../styles/modules/index.module.scss";
import { fetcher } from "./_app";
import http from "../utils/http";
import TodoItem from "components/TodoItem";
import { NextPage } from "next";
import useInput from "hooks/useInput";

interface IndexPageProps {
    todos: Todo[];
}

const IndexPage: NextPage<IndexPageProps> = ({ todos: initialData = [] }) => {
    const { data: todos, error, mutate } = useSWR<Todo[]>("/todos", { initialData });
    const { input, onChange } = useInput();
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const onSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (input.trim().length === 0) return;

            http.post("/todos", {
                content: input,
                checked: false
            }).then(res => {
                const data = res.data as Todo;
                mutate([...(todos ? todos : []), data], false);
                onChange("");
            });
        },
        [input, todos, mutate]
    );

    const onToggle = useCallback(
        (id: number) => {
            const todo = todos?.find(todo => todo.id === id);

            if (todo?.id) {
                http.put(`/todos/${todo?.id}`, {
                    ...todo,
                    checked: !todo?.checked
                }).then(res => {
                    const data = res.data as Todo;
                    mutate(todos?.map(todo => (todo.id === data.id ? data : todo)));
                });
            }
        },
        [mutate, todos]
    );

    const onDelete = useCallback(
        (id: number) => {
            http.delete(`/todos/${id}`).then(() => {
                mutate(todos?.filter(todo => todo.id === id));
            });
        },
        [mutate, todos]
    );

    if (error) return <h1>{error}</h1>;
    if (!todos) return <h1>Loading...</h1>;

    return (
        <>
            <h1 className={style.title}>Todo List 🔥</h1>
            <h2 className={style.date}>{new Date().toLocaleDateString("ko-KR")}</h2>

            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    name="content"
                    className={style.input}
                    onChange={onChange}
                    value={input}
                    placeholder="Type Here..."
                    ref={inputRef}
                />
            </form>

            <div className={style.listContainer}>
                {todos.length > 0 ? (
                    <ul>
                        {todos.map(todo => (
                            <TodoItem {...(todo as Required<Todo>)} key={todo.id} onToggle={onToggle} onDelete={onDelete} />
                        ))}
                    </ul>
                ) : (
                    <div className={style.empty}>존재하지 않습니다.</div>
                )}
            </div>
        </>
    );
};

export default IndexPage;

export async function getServerSideProps() {
    try {
        const todos = await fetcher("/todos");
        return {
            props: {
                todos
            }
        };
    } catch (error) {
        console.error(error);
        return {
            props: {
                todos: []
            }
        };
    }
}
