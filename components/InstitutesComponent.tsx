import React from "react";
import InstituteCardWithImage from "./ui/InstituteCardWithImage";

type Props = {};

const InstitutesComponent = (props: Props) => {
  return (
    <section className=" grid grid-cols-1 sm:grid-cols-4 gap-4 p-4">
     <InstituteCardWithImage />
     <InstituteCardWithImage />
     <InstituteCardWithImage />
     <InstituteCardWithImage />
     <InstituteCardWithImage />
     <InstituteCardWithImage />
     <InstituteCardWithImage />
     <InstituteCardWithImage />
    </section>
  );
};

export default InstitutesComponent;
