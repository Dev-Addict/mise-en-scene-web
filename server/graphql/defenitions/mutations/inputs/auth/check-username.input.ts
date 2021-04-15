import { inputObjectType } from "nexus";

import { UsernameScalar } from "../../../scalars";

export const CheckUsernameData = inputObjectType({
  name: "CheckUsernameData",
  definition(t) {
    t.nonNull.field("username", { type: UsernameScalar });
  },
});
