import { User } from "@models/user";
import { atomWithReset } from "jotai/utils";

export const userAtom = atomWithReset<User | null>(null);
