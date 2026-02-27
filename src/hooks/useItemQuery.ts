import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { ItemDetail, ItemListResponse } from "@/lib/pokemon-api";

export function useItems(
    page: number,
    limit: number = 20,
    searchQuery: string = "",
    category: string = ""
) {
    return useQuery<ItemListResponse, Error>({
        queryKey: ["items", page, limit, searchQuery, category],
        queryFn: async () => {
            const offset = (page - 1) * limit;
            let url = `/api/items?limit=${limit}&offset=${offset}`;
            if (searchQuery) url += `&search=${encodeURIComponent(searchQuery)}`;
            if (category) url += `&category=${encodeURIComponent(category)}`;

            const res = await fetch(url);
            if (!res.ok) throw new Error("Failed to fetch items");
            return res.json();
        },
        staleTime: 60000,
        placeholderData: keepPreviousData,
    });
}

export function useItemCategories() {
    return useQuery<{ name: string; url: string }[], Error>({
        queryKey: ["item-categories"],
        queryFn: async () => {
            const res = await fetch("/api/items/categories");
            if (!res.ok) throw new Error("Failed to fetch item categories");
            return res.json();
        },
        staleTime: 3600000, // 1 hour 
    });
}

export function useItem(id: string | number) {
    return useQuery<ItemDetail, Error>({
        queryKey: ["item", id],
        queryFn: async () => {
            const res = await fetch(`https://pokeapi.co/api/v2/item/${id}`);
            if (!res.ok) {
                throw new Error("Failed to fetch item details");
            }
            return res.json();
        },
        staleTime: 600000, // 10 minutes cache
    });
}
