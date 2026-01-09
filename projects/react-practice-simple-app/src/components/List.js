import ListItem from "./ListItem";
import { concepts } from "../data/concept";

export default function List() {
    return(
        <ul id="concepts">
            {concepts.map(item => <ListItem  key={item.title} item={item} />)}
        </ul>
    )
}