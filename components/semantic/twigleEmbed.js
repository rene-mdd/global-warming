import { useEffect } from "react";

const TwingleEmbed = () => {
  useEffect(() => {
    // Dynamically create and append the script to the DOM
    const script = document.createElement("script");
    // eslint-disable-next-line prefer-template
    const id = "_" + Math.random().toString(36).substr(2, 9); // Generate unique ID
    const div = document.createElement("div");
    div.id = `twingle-public-embed-${id}`;
    document.getElementById("twingle-container").appendChild(div); // Append to the container

    script.src = `https://spenden.twingle.de/embed/climate-accountability-api/climate-accountability-api/tw6703d3219df31/form/${id}`;
    script.type = "text/javascript";
    script.async = true;
    script.defer = true;

    document.body.appendChild(script); // Append script to body
    return () => {
      // Cleanup: remove script and div when the component is unmounted
      document.body.removeChild(script);
      if (document.getElementById("twingle-container"))
        document.getElementById("twingle-container").removeChild(div);
    };
  }, []);

  return <div id="twingle-container" />;
};

export default TwingleEmbed;
