import {
    createLoader,
    parseAsString,
} from "nuqs/server"


export const filtersSearchParams = {
    chatId: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
    text: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
}

export const loadSearchParams = createLoader(filtersSearchParams)