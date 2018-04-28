import { without } from "lodash";

export const isLoading = status => status === "loading";
export const isInitial = status => status === "initial";

export const diffDataSequence = (previousSequence, incoming) => {
  const incomingSequence = incoming.map(({ id }) => id);

  return [
    ...previousSequence,
    ...without(incomingSequence, ...previousSequence)
  ];
};
