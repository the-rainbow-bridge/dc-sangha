export default function VideoEmbed({videoID}: {videoID: string}) {

    const embedURL = `https://www.youtube.com/embed/${videoID}`

    return (
        <div class="aspect-w-16 aspect-h-9">
            <iframe
                width="750"
                height="515"
                title="YouTube video player"
                src={embedURL}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
            ></iframe>
        </div>
    )
}