/** A BaseAction only requires a type property */
type BaseAction<Type = string> = { type: Type };
/** A PayloadAction is a BaseAction with a payload */
type PayloadAction<Type, Payload> = { type: Type; payload: Payload };
/** An Action can be either a BaseAction or a PayloadAction */
type Action<Type = string, Payload = undefined> = Payload extends undefined
  ? BaseAction<Type>
  : PayloadAction<Type, Payload>;

/** A Dispatch is a function that takes an Action and applies some effect to a
 * reducer */
type Dispatch<Action> = (action: Action) => void;
