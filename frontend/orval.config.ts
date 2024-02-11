module.exports = {
  doshroBazar: {
    input: {
      target: 'https://34.228.20.185/api/schema/',
    },
    output: {
      mode: 'tags-split',
      target: 'orval/burgler.ts',
      schemas: 'orval/model',
      client: 'react-query',
      mock: true,

      override: {
        mutator: {
          path: 'custom-instance.ts',
          name: 'customInstance',
        },
        query: {
          useQuery: true,
          useInfinite: true,
          options: {
            staleTime: Infinity,
            refetchOnWindowFocus: false,
            retry: 2,
          },
        },
      },
    },
  },
};
