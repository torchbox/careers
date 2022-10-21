type KeyValuePair = { [key: string]: string };

type Animation = {
    keyframes: any; // [KeyValuePair];
    options: {
        duration?: number;
        easing?: string;
    };
};

/**
 * Applies an animation object (including keyframes and options)
 * to the given element. See static_src/animations for examples.
 * @param {HTMLElement} element
 * @param {Animation} animation
 */
export const animate = (element: HTMLElement, animation: Animation) => {
    const { keyframes, options } = animation;

    const animationHandler = element.animate(keyframes, options);

    animationHandler.onfinish = () => {
        // When the animation has finished, set the element styles to the final frame of the animation.
        // This prevents the animated object flickering back to its original styles.
        const finalAnimationStyles = animation.keyframes.at(-1);

        Object.keys(finalAnimationStyles as KeyValuePair).forEach(
            (key: any) => {
                element.style[key as any] = (
                    finalAnimationStyles as KeyValuePair
                )[key];
            },
        );
    };
};

/**
 * Applies an animation object (including keyframes and options)
 * to the given element. See static_src/animations for examples.
 * Accepts a second options object to override the first with custom values.
 * @param {HTMLElement} element
 * @param {Animation} animation
 * @param {Animation Options} options
 */
export const animateWithOptions = (
    element: HTMLElement,
    animation: Animation,
    options: any,
) => {
    const { keyframes } = animation;
    const baseOptions = {
        ...animation.options,
        ...options,
    };

    animate(element, { keyframes, options: baseOptions });
};

/**
 * Client logo appearance animation
 */
export const fadeInSlideUp = {
    keyframes: [
        { transform: 'translateY(25px)', opacity: 0 },
        { opacity: 1, offset: 0.75 },
        { transform: 'translateY(0)', opacity: 1 },
    ],
    options: {
        duration: 540,
        easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    },
};
