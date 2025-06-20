const Contact = () => {
    const socials = [
      { title: "Facebook", link: "#" },
      { title: "Instagram", link: "#" },
      { title: "Behance", link: "#" },
      { title: "Dribbble", link: "#" },
      { title: "LinkedIn", link: "#" },
      { title: "YouTube", link: "#" },
    ];
  
    return (
      <div
        className="flex flex-wrap justify-between gap-x-4 gap-y-2 pb-[30px] border-b mt-[140px] !font-clash"
        style={{ borderColor: "#CDCDCD" }}
      >
        {socials.map((social, index) => (
          <a key={index} href={social.link} className="text-black font-semibold uppercase">
            {social.title}
          </a>
        ))}
      </div>
    );
  };
  
  export default Contact;
  