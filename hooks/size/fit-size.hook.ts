export const useFitSize = (
	ratio: number,
	minWidth: number,
	minHeight: number
) => {
	const isWidthBigger = minWidth / minHeight;

	const max = Math.max(minWidth, minHeight);
	const min = Math.min(minWidth, minHeight);

	const firstNumber = Math.ceil(max / ratio) * ratio;
	const secondNumber = (firstNumber / max) * min;

	return {
		width: isWidthBigger ? firstNumber : secondNumber,
		height: isWidthBigger ? secondNumber : firstNumber,
	};
};
