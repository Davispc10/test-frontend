import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "./useDebounce";

describe("useDebounce", () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it("should return initial value immediately", () => {
        const { result } = renderHook(() => useDebounce("initial", 500));
        expect(result.current).toBe("initial");
    });

    it("should debounce value updates", () => {
        const { result, rerender } = renderHook(
            ({ value, delay }) => useDebounce(value, delay),
            { initialProps: { value: "initial", delay: 500 } }
        );

        // Update value
        rerender({ value: "updated", delay: 500 });

        // Value should not update immediately
        expect(result.current).toBe("initial");

        // Fast forward time by 250ms
        act(() => {
            jest.advanceTimersByTime(250);
        });

        // Value should still not update
        expect(result.current).toBe("initial");

        // Fast forward time by another 250ms (total 500ms)
        act(() => {
            jest.advanceTimersByTime(250);
        });

        // Value should now be updated
        expect(result.current).toBe("updated");
    });

    it("should cancel previous timer if value changes before delay", () => {
        const { result, rerender } = renderHook(
            ({ value, delay }) => useDebounce(value, delay),
            { initialProps: { value: "initial", delay: 500 } }
        );

        // Update value to 'update1'
        rerender({ value: "update1", delay: 500 });

        act(() => {
            jest.advanceTimersByTime(250);
        });

        // Update value to 'update2' before delay completes
        rerender({ value: "update2", delay: 500 });

        act(() => {
            jest.advanceTimersByTime(250);
        });

        // 500ms after 'update1' start, but the timer was cancelled, so it should still be 'initial'
        expect(result.current).toBe("initial");

        act(() => {
            jest.advanceTimersByTime(250);
        });

        // 500ms after 'update2' start, it should update
        expect(result.current).toBe("update2");
    });
});
