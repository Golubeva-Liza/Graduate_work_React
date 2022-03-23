import { useState } from "react";
export function useInput(initialValue) {
   const [value, setValue] = useState(initialValue);

   const onChange = e => {
      setValue(e.target.value);
   }

   const removeValue = e => {
      setValue(initialValue);
   }

   return {value, setValue, onChange, removeValue};
}