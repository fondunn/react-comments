const offset = 350
export const getNumberId = () =>
	Math.floor(Math.random() * (10000 - offset + 1)) + offset
