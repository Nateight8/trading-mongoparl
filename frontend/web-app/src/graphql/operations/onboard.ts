import { gql } from "@apollo/client";

const onboardOperations = {
  Mutations: {
    createOnboarding: gql`
      mutation Mutation($input: OnboardUserInput!) {
        onboardUser(input: $input) {
          message
          success
        }
      }
    `,
  },
};

export default onboardOperations;
