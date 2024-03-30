import { createStore } from "solid-js/store"
import { cn } from "../lib/utils"
import { navigate } from "astro:transitions/client"

export default function ContactForm() {

    interface FormData {
        email: string
        message: string
    }
    
    const [fields, setFields] = createStore<FormData>({
        email: "",
        message: "",
    })

    const [errors, setErrors] = createStore({
        message: "", 
    })

    async function handleSubmitForm(e: Event) {
        e.preventDefault()
        
        try {
            await fetch("https://formspree.io/f/xgegnlrk", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(fields),
            }).then(() => {
                setFields({
                email: "",
                message: "",
                })
            })
            navigate("/contact-success")
        } catch (error) {
            console.error(error)
            setErrors("message", "An error occurred. Please try again.")
        }
    }

    const validateEmail = (email: string) => {
        const validEmail: RegExp = /\S+@\S+\.\S+/
        if (!validEmail.test(email)) setErrors({ message: "Please enter a valid email, example: example@example.com" })
        else setErrors({ message: "" })
    }
    
    return (
        <form class="animate" onSubmit={handleSubmitForm}>
            <h1 class="animate text-lg md:text-xl lg:text-2xl font-semibold opacity-75 mb-2">send us a message</h1>
            <p class="text-xs text-red-600">{errors.message}</p>
            <div class="field-block group p-4 gap-3 flex items-center border rounded-lg hover:bg-black/5 hover:dark:bg-white/10 border-black/15 dark:border-white/20 transition-colors duration-300 ease-in-out mb-2">
                <label class="w-1/4" for="email">Email</label>
                <input
                name="email"
                type="email"
                placeholder="Your email"
                onInput={(e) => setFields("email", e.target.value)}
                onBlur={(e) => validateEmail(e.target.value)}
                aria-required="true"
                required
                aria-label="Email address"
                class="w-full px-2.5 py-1.5 pl-10 rounded outline-none text-black dark:text-white bg-black/5 dark:bg-white/15 border border-black/10 dark:border-white/20 focus:border-black focus:dark:border-white"
                />
            </div>
            <div class="field-block group p-4 gap-3 flex items-center border rounded-lg hover:bg-black/5 hover:dark:bg-white/10 border-black/15 dark:border-white/20 transition-colors duration-300 ease-in-out mb-2">
                <label class="w-1/4" for="message">Message</label>
                <input
                type="textbox"
                name="message"
                placeholder="Your message here"
                onInput={(e) => setFields("message", e.target.value)}
                aria-required="true"
                required
                aria-label="Enter a message"
                class="w-full px-2.5 py-1.5 pl-10 rounded outline-none text-black dark:text-white bg-black/5 dark:bg-white/15 border border-black/10 dark:border-white/20 focus:border-black focus:dark:border-white"
                />
            </div>
            <button class={cn(
                "h-8 rounded-full px-3 text-current mt-4",
                "flex items-center justify-center",
                "animate transition-colors duration-300 ease-in-out mb-2",
                "bg-black dark:bg-white text-white dark:text-black",
                "hover:bg-black/5 dark:hover:bg-white/20 hover:text-black dark:hover:text-white"
            )} type="submit">Submit</button>
        </form>
    )
}