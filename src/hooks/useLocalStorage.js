import { useState } from "react";

// Hook
export default function useLocalStorage(key, initialValue) {
	const [storedValue, setStoredValue] = useState(() => {
		try {
			const item = localStorage.getItem(key);
			initialValue = item;
			return item ? JSON.parse(item) : item;
		} catch (error) {
			return initialValue;
		}
	});

	const setValue = (value) => {
		try {
			const valueToStore = value instanceof Function ? value(storedValue) : value;
			setStoredValue(valueToStore);
			if (typeof window !== "undefined") {
				localStorage.setItem(key, JSON.stringify(valueToStore));
			}
		} catch (error) {
			console.log(error);
		}
	};
	return [storedValue, setValue];
}
