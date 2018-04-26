import { without } from "lodash";

export const isLoading = status => status === "loading";

export const diffDataSequence = (
  previousSequence,
  incoming,
  sorted = false
) => {
  const incomingSequence = incoming.map(({ id }) => id);

  return [
    ...previousSequence,
    ...without(incomingSequence, ...previousSequence)
  ];
};
