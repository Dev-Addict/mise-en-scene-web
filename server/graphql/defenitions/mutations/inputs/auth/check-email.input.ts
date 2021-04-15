import { inputObjectType } from "nexus";

import { EmailScalar } from "../../../scalars";

export const CheckEmailData = inputObjectType({
  name: "CheckEmailData",
  definition(t) {
    t.nonNull.field("email", { type: EmailScalar });
  },
});
