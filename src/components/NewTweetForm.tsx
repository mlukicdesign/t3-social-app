import { useSession } from "next-auth/react";
import { 
    useEffect, 
    useState, 
    useRef, 
    useCallback } from "react";
    
import { api } from "~/utils/api";
import Button from "./Button";
import ProfileImage from "./ProfileImage";

function updateTextAreaSize (textArea?: HTMLTextAreaElement) {
    if (textArea == null) return;
    textArea.style.height = "0px";
    textArea.style.height = `${textArea.scrollHeight}px`;
}



{/* The TextAreaRef is a useRef that is initialized with a reference to an HTML textarea element (of type HTMLTextAreaElement). This reference is used to access and manipulate the textarea DOM element later. 

The inputRef function is declared using the useCallback hook. It receives a textArea argument, which is expected to be an HTML textarea element. Inside this function, updateTextAreaSize is called with the provided textArea, and then the textArea reference is stored in TextAreaRef.current. 

An effect is defined using the useEffect hook. This effect is triggered when the inputValue changes. Inside the effect, it calls the updateTextAreaSize function with the textarea reference stored in TextAreaRef.current. This likely means that the textarea's size is updated whenever the inputValue changes, ensuring that it grows or shrinks as the user types in more text.

*/}

export function NewTweetForm() {
    const session = useSession()
    if (session.status !== "authenticated") return;

    return <Form />;

}

function Form() {

    const session = useSession()
    const [inputValue, setInputValue] = useState("")
    const TextAreaRef = useRef<HTMLTextAreaElement>()

    const inputRef = useCallback((textArea: HTMLTextAreaElement) => {
      updateTextAreaSize(textArea)  ;
      TextAreaRef.current = textArea;
    }, [])

    useEffect(() => {
        updateTextAreaSize(TextAreaRef.current)
    }, [inputValue])


    const createTweet = api.tweet.create.useMutation({ 
        onSuccess: (newTweet) => {
        console.log(newTweet);
        setInputValue("")
        },
    });

    if (session.status !== "authenticated") return null;

    function handleSubmit(e: FormEvent) {
        e.preventDefault()

        createTweet.mutate({content: inputValue})
    }


    return <form onSubmit={handleSubmit} className="flex flex-col gap-2 border-b px-4 py-2">
        <div className="flex gap-4">
            <ProfileImage src={session.data.user.image} />
            <textarea 
            style={{height: 0}}
            ref={inputRef}
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            className="flex-grow resize-none overflow-hidden p-4 text-lg outline-none" 
            placeholder="what's happening?"/>
        </div>
            <Button className="self-end">Shout & Yell</Button>
    </form>
}