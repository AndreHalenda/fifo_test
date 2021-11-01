export const idlFactory = ({ IDL }) => {
    return IDL.Service({
      'greet' : IDL.Func([IDL.Text], [IDL.Text], []),
      'enqueue' : IDL.Func([], [IDL.Text], []),
      'dequeue' : IDL.Func([], [], []),
      'fifo' : IDL.Func([], [], []),
    });
  };
export const init = ({ IDL }) => { return []; };
