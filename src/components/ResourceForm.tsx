import { createStore } from "solid-js/store"
import { cn } from "../lib/utils"
import { navigate } from "astro:transitions/client"

export default function ResourceForm() {

    interface FormData {
        type: string
        title: string
        summary: string
        link: string
        details: string
        email: string
    }
    
    const [fields, setFields] = createStore<FormData>({
        type: "",
        title: "",
        summary: "",
        link: "",
        details: "",
        email: "",
    })

    const [errors, setErrors] = createStore({
        message: "", 
    })

    async function handleSubmitForm(e: Event) {
        e.preventDefault()
        
        try {
            await fetch("https://formspree.io/f/xgegnzpr", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(fields),
            })

            navigate("/resources/submitted")
        } catch (error) {
            console.error(error)
            setErrors("message", "An error occurred. Please try again.")
        }
    }
    
    return (
        <form class="animate" onSubmit={handleSubmitForm}>
            <h1 class="animate text-lg md:text-xl lg:text-2xl font-semibold opacity-75 mb-2">Submit a new resource to the community</h1>
            <p class="text-xs text-red-600">{errors.message}</p>
            <div class="field-block group p-4 gap-3 flex items-center border rounded-lg hover:bg-black/5 hover:dark:bg-white/10 border-black/15 dark:border-white/20 transition-colors duration-300 ease-in-out mb-2">
                <label class="w-1/4" for="type">Type of resource</label>
                <select
                name="type"
                onInput={(e) => setFields("type", e.target.value)}
                class="w-full px-2.5 py-1.5 pl-10 rounded outline-none text-black dark:text-white bg-black/5 dark:bg-white/15 border border-black/10 dark:border-white/20 focus:border-black focus:dark:border-white"
                >
                    <option value="">Select a type</option>
                    <option value="podcasts">Podcast</option>
                    <option value="books">Book</option>
                    <option value="events">Event</option>
                    <option value="accounts">Social Media Account</option>
                    <option value="articles">Online Article</option>
                    <option value="pdfs">PDF</option>
                    <option value="videos">Video</option>
                    </select>
            </div>
            <div class="field-block group p-4 gap-3 flex items-center border rounded-lg hover:bg-black/5 hover:dark:bg-white/10 border-black/15 dark:border-white/20 transition-colors duration-300 ease-in-out mb-2">
                <label class="w-1/4" for="title">Title*</label>
                <input
                type="text"
                name="title"
                placeholder="Title"
                required
                minlength="8"
                onInput={(e) => setFields("title", e.target.value)}
                aria-label="Title of the resource"
                class="w-full px-2.5 py-1.5 pl-10 rounded outline-none text-black dark:text-white bg-black/5 dark:bg-white/15 border border-black/10 dark:border-white/20 focus:border-black focus:dark:border-white"
                />
            </div>
            <div class="field-block group p-4 gap-3 flex items-center border rounded-lg hover:bg-black/5 hover:dark:bg-white/10 border-black/15 dark:border-white/20 transition-colors duration-300 ease-in-out mb-2">
                <label class="w-1/4" for="summary">Summary</label>
                <input
                type="text"
                name="summary"
                placeholder="A brief summary of the resource"
                onInput={(e) => setFields("summary", e.target.value)}
                aria-label="Summary of the resource"
                class="w-full px-2.5 py-1.5 pl-10 rounded outline-none text-black dark:text-white bg-black/5 dark:bg-white/15 border border-black/10 dark:border-white/20 focus:border-black focus:dark:border-white"
                />
            </div>
            <div class="field-block group p-4 gap-3 flex items-center border rounded-lg hover:bg-black/5 hover:dark:bg-white/10 border-black/15 dark:border-white/20 transition-colors duration-300 ease-in-out mb-2">
                <label class="w-1/4" for="link">Link*</label>
                <input
                type="text"
                name="link"
                required
                placeholder="A link to the resource"
                onInput={(e) => setFields("link", e.target.value)}
                aria-label="Link to the resource"
                class="w-full px-2.5 py-1.5 pl-10 rounded outline-none text-black dark:text-white bg-black/5 dark:bg-white/15 border border-black/10 dark:border-white/20 focus:border-black focus:dark:border-white"
                />
            </div>
            <div class="field-block group p-4 gap-3 flex items-center border rounded-lg hover:bg-black/5 hover:dark:bg-white/10 border-black/15 dark:border-white/20 transition-colors duration-300 ease-in-out mb-2">
                <label class="w-1/4" for="details">Details</label>
                <input
                type="text"
                name="details"
                placeholder="Any relevant details"
                onInput={(e) => setFields("details", e.target.value)}
                aria-label="Details of the resource"
                class="w-full px-2.5 py-1.5 pl-10 rounded outline-none text-black dark:text-white bg-black/5 dark:bg-white/15 border border-black/10 dark:border-white/20 focus:border-black focus:dark:border-white"
                />
            </div>
            <div class="field-block group p-4 gap-3 flex items-center border rounded-lg hover:bg-black/5 hover:dark:bg-white/10 border-black/15 dark:border-white/20 transition-colors duration-300 ease-in-out mb-2">
                <label class="w-1/4" for="email">Email</label>
                <input
                name="email"
                type="email"
                placeholder="Your email"
                onInput={(e) => setFields("email", e.target.value)}
                aria-label="Email address"
                class="w-full px-2.5 py-1.5 pl-10 rounded outline-none text-black dark:text-white bg-black/5 dark:bg-white/15 border border-black/10 dark:border-white/20 focus:border-black focus:dark:border-white"
                />
            </div>
            <p class="text-xs">Add your email address if you would like to be notified when your resource is approved, or if it is rejected.</p>
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

// user choose a resource type to add, and fields are displayed based on that type
// at least one field has to be filled in
// - Podcast
// - Name
//     - Episode (optional)
//     - Link (optional)
//     - Tags
// - Book
//     - Title
//     - Author
//     - Tags
// - Event (Sangha meeting, retreat, other)
//     - Name
//     - Date
//     - Time
//     - Location
//     - Host
//     - Cost
//     - Link
//     - Tags
// - Social media account
//     - Name
//     - Youtube Link (optional)
//     - Twitter Link (optional)
//     - Instagram Link (optional)
//     - TikTok Link (optional)
//     - Tags
// - Online article
//     - Title
//     - Author
//     - Link
//     - Tags
// - PDF
//     - Title
//     - Tags
// - Video
//     - Title
//     - Link
//     - Tags
// optional email address