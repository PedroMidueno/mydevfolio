export default defineAppConfig({
  ui: {
    colors: {
      primary: 'blue'
    },
    button: {
      slots: {
        base: 'cursor-pointer'
      }
    },
    input: {
      slots: {
        base: 'disabled:cursor-default disabled:opacity-100'
      }
    },
    textarea: {
      slots: {
        base: 'disabled:cursor-default disabled:opacity-100'
      }
    },
    formField: {
      slots: {
        root: 'min-h-[90px]'
      }
    }
  }
})