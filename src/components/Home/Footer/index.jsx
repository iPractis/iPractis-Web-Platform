import { OneFooterColumn, TwoFooterColumn } from "./FooterColumns";
import SmallFooter from "./SmallFooter";

// Icon && images
import linkedin from "@/public/icons/linkedin-black.png";
import instagram from "@/public/icons/instagram-black.png";
import facebook from "@/public/icons/facebook-black.png";
import youtube from "@/public/icons/youtube-black.png";

const Footer = () => {
  return (
    <footer>
      <div className="bg-primary-color-P2">
        <div className="container-page-v1 md:py-[60px] py-10">
          <article className="grid xs:grid-cols-2 sm:grid-cols-4 grid-cols-1 place-items-stretch xs:text-start text-center gap-[30px]">
            <TwoFooterColumn
              columnOne={{
                title: "About iPractis",
                columns: [
                  { title: "Corporate Entity" },
                  { title: "Careers" },
                  { title: "External Services" },
                ],
              }}
              columnTwo={{
                title: "Legal",
                columns: [
                  { title: "Terms of use" },
                  { title: "Privacy policy" },
                  { title: "Cookie policy" },
                ],
              }}
            />

            <TwoFooterColumn
              columnOne={{
                title: "Services",
                columns: [
                  { title: "1:1 Online lesson" },
                  { title: "Library access" },
                  { title: "Family account" },
                  { title: "Enterprise account" },
                  { title: "Government account" },
                ],
              }}
              columnTwo={{
                title: "Teaching",
                columns: [
                  { title: "Become a teacher" },
                  { title: "Code of conduct" },
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
                      { src: linkedin },
                      { src: youtube },
                      { src: instagram },
                      { src: facebook },
                    ],
                  },
                ],
              }}
            />
          </article>

          <article className="grid xs:grid-cols-2 sm:grid-cols-4 grid-cols-1 place-items-stretch xs:text-start text-center gap-[30px] xs:mt-[100px] mt-[31px]">
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
