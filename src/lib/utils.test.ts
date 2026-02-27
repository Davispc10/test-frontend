import { cn } from "./utils";

describe("utils", () => {
    describe("cn", () => {
        it("should merge basic tailwind classes", () => {
            expect(cn("w-full", "h-full")).toBe("w-full h-full");
        });

        it("should override conflicting tailwind classes correctly", () => {
            // tailwind-merge should resolve conflicting padding classes
            expect(cn("px-2 py-1", "p-4")).toBe("p-4");
        });

        it("should handle conditional classes", () => {
            expect(cn("text-black", true && "bg-white", false && "hidden")).toBe("text-black bg-white");
        });

        it("should handle arrays and objects", () => {
            expect(cn("flex", ["items-center", "justify-center"], { "rounded-md": true, "shadow-md": false })).toBe("flex items-center justify-center rounded-md");
        });
    });
});
