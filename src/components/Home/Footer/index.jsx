import { OneFooterColumn } from "./FooterColumns";
import SmallFooter from "./SmallFooter";
import {
  LinkedInIcon,
  YoutubeIcon,
  InstagramIcon,
  RedditIcon
} from "../../Icons";

const Footer = () => {
  return (
    <footer>
      <div className="bg-primary-color-P12 text-primary-color-P1">
        <div className="container-page-v1 md:py-[60px] py-10">
          <article className="grid xs:grid-cols-2 sm:grid-cols-4 grid-cols-1 place-items-stretch xs:text-start text-center gap-[30px]">
            <OneFooterColumn
              column={{
                title: "About iPractis",
                columns: [
                  { title: "Corporate Entity" },
                  { title: "Careers" },
                  { title: "External Services" },
                ],
              }}
            />

            <OneFooterColumn
              column={{
                title: "Services",
                columns: [
                  { title: "1:1 Online lesson" },
                  { title: "Library access" },
                  { title: "Family account" },
                  { title: "Enterprise account" },
                  { title: "Government account" },
                ],
              }}
            />

            <OneFooterColumn
              column={{
                title: "Support",
                columns: [
                  { title: "Support center" },
                  { title: "Report a concern" },
                  { title: "FAQ" },
                  { title: "Blog" },
                ],
              }}
            />

            <OneFooterColumn
              column={{
                title: "Promotion",
                columns: [
                  { title: "Refer to a friend" },

                  {
                    icons: [
                      {
                        src: <LinkedInIcon fillColor="fill-primary-color-P1" ariaLabel="LinkedIn" />,
                        href: "https://www.linkedin.com/company/ipractis",
                        size: "w-[36px] h-[36px]"
                      },
                      {
                        src: <YoutubeIcon fillColor="fill-primary-color-P1" ariaLabel="YouTube" />,
                        href: "https://www.youtube.com/@iPractis",
                        size: "w-[36px] h-[36px]"
                      },
                      {
                        src: <InstagramIcon fillColor="fill-primary-color-P1" ariaLabel="Instagram" />,
                        href: "https://www.instagram.com/ipractis/",
                        size: "w-[36px] h-[36px]"
                      },
                      {
                        src: <RedditIcon fillColor="fill-primary-color-P1" ariaLabel="Reddit" />,
                        href: "https://www.reddit.com/r/iPractis/",
                        size: "w-[36px] h-[36px]"
                      },
                    ],
                  },
                ],
              }}
            />

            <OneFooterColumn
              column={{
                title: "Teaching",
                columns: [
                  { title: "Become a teacher" },
                  { title: "Code of conduct" },
                ],
              }}
            />

            <OneFooterColumn
              column={{
                title: "Legal",
                columns: [
                  { title: "Terms of use" },
                  { title: "Privacy policy" },
                  { title: "Cookie policy" },
                ],
              }}
            />
          </article>

          <article className="grid xs:grid-cols-2 sm:grid-cols-4 grid-cols-1 place-items-stretch xs:text-start text-center gap-[30px] mt-[100px]">
            <OneFooterColumn
              column={{
                title: "Linguistic subjects",
                columns: [
                  {
                    title: "Learn English",
                  },

                  {
                    title: "Learn French",
                  },

                  {
                    title: "Learn Spanish",
                  },

                  {
                    title: "Learn Italian",
                  },

                  {
                    title: "Learn Japenese",
                  },
                ],
              }}
            />

            <OneFooterColumn
              column={{
                title: "Scientific subjects",
                columns: [
                  {
                    title: "Learn mathematic",
                  },

                  {
                    title: "Learn science",
                  },

                  {
                    title: "Learn physics",
                  },

                  {
                    title: "Learn chemistry",
                  },

                  {
                    title: "Learn biology",
                  },
                ],
              }}
            />

            <OneFooterColumn
              column={{
                title: "Artistic subjects",
                columns: [
                  {
                    title: "Learn drawing",
                  },

                  {
                    title: "Learn singing",
                  },

                  {
                    title: "Learn fashion",
                  },

                  {
                    title: "Learn design",
                  },

                  {
                    title: "Learn 3D sculpting",
                  },
                ],
              }}
            />

            <OneFooterColumn
              column={{
                title: "Professional subjects",
                columns: [
                  {
                    title: "Learn drawing",
                  },

                  {
                    title: "Learn singing",
                  },

                  {
                    title: "Learn fashion",
                  },

                  {
                    title: "Learn history",
                  },

                  {
                    title: "Learn 3D sculpting",
                  },
                ],
              }}
            />
          </article>
        </div>
      </div>

      {/* Footer of all right reserved */}
      <SmallFooter />
    </footer>
  );
};

export default Footer;
