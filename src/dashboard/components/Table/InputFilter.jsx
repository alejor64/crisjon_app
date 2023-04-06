import { Input, Label } from "../../../components/form"

export const InputFilter = ({route, onKeyUp}) => {
  const routeCapitalized = route.charAt(0).toUpperCase() + route.slice(1);
  return (
    <div className="p-4 flex items-center md:w-2/3 sm:w-full">
      <Label text={`${routeCapitalized} info`} htmlFor="searchClient" css="w-[100px] text-[18px]" />
      <Input
        type="text"
        name="searchClient"
        id="searchClient"
        placeholder="type something to search"
        autoComplete='off'
        css="ml-2"
        onKeyUp={onKeyUp}
      />
    </div>
  )
}
