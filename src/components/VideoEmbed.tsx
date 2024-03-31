export default function VideoEmbed({videoID}: {videoID: string}) {

    const embedURL = `https://www.youtube.com/embed/${videoID}`

    return (
        <>
        <div class="relative w-full overflow-hidden" style="padding-top: 56.25%;">
            <iframe
                class="absolute top-0 left-0 w-full h-full"
                width="750"
                height="515"
                title="YouTube video player"
                src={embedURL}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
            ></iframe>
        </div>
        {/* <div class="lg:hidden xl:hidden overflow-hidden"> */}
            {/* <iframe
                class="lg:hidden xl:hidden overflow-hidden"
                width="400"
                height="300"
                title="YouTube video player"
                src={embedURL}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
            ></iframe> */}
        {/* </div> */}
        </>
    )
}