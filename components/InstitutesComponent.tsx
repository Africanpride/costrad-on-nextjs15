import React from "react";
import CardWithImage from "./ui/CardWithImage";

type Props = {};

const InstitutesComponent = (props: Props) => {
  return (
    <section className=" grid grid-cols-1 sm:grid-cols-4 gap-4 p-4">
     <CardWithImage />
     <CardWithImage />
     <CardWithImage />
     <CardWithImage />
     <CardWithImage />
     <CardWithImage />
     <CardWithImage />
     <CardWithImage />
    </section>
  );
};

export default InstitutesComponent;
