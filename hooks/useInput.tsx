import React, { useState } from "react";

const useInput = (defaultValue?: string) => {
    const [input, setInput] = useState<string>(defaultValue || "");

    const onChange = (v: React.ChangeEvent<HTMLInputElement> | string) => {
        if (typeof v === "string") {
            setInput(v);
            return;
        }

        setInput(v.target.value);
    };

    return {
        input,
        onChange
    };
};

export default useInput;
