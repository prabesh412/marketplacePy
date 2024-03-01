module.exports = {
  doshroBazar: {
    input: {
      target: './doshro_bazar.yaml',
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
