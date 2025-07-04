import BlurText from "./text";
import GetData from "./getForm";

export default function HEroPage() {
  return (
    <>
      <div className="min-h-screen pt-16 md:pt-0 flex justify-center items-center">
        <div className="container animate__animated relative animate__fadeInUp w-[90%] md:w-[70%] 2xl:w-[70%] flex-col-reverse mx-auto lg:flex-row px-6 pb-8 pt-8 sm:pt-10 lg:px-8 lg:pt-[70px]">
          <div className="flex flex-col items-center justify-center">
            <div>
              <BlurText
                text="SubScoop!"
                delay={150}
                animateBy="words"
                direction="top"
                className="text-6xl font-bold mb-8"
              />
            </div>
            <BlurText
              text="A platform to download youtube video subtitles!"
              delay={250}
              animateBy="words"
              direction="top"
              className="text-3xl font-light mb-8"
            />
            <div>
              <GetData />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
