import React from "react";
import { Todo } from "../interfaces/Todo";
import style from "../styles/modules/TodoItem.module.scss";
import { AiFillCheckCircle, AiOutlineCheckCircle, AiOutlineDelete } from "react-icons/ai";

interface TodoItemProps {
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps & Required<Todo>> = ({ id, content, checked, onToggle, onDelete }) => {
    return (
        <li className={style.item}>
            <span className={style.checkbox} onClick={() => onToggle(id)}>
                {checked ? <AiFillCheckCircle /> : <AiOutlineCheckCircle />}
            </span>
            <span className={`${style.content} ${checked ? style.done : ""}`}>{content}</span>
            <span className={style.deleteBtn} onClick={() => onDelete(id)}>
                <AiOutlineDelete />
            </span>
        </li>
    );
};

export default React.memo(TodoItem);
