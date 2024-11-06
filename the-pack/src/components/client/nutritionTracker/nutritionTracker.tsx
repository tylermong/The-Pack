'use client'

import React, { useEffect, useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "@/components/ui/accordion"
  

const NutritionTracker = () =>{
    return(
        <div className="nutrition-tracker">
            <Accordion type="single" collapsible>
                <AccordionItem value="breakfast">
                    <AccordionTrigger>Breakfast</AccordionTrigger>
                        <AccordionContent>
                            Breakfast Content
                        </AccordionContent>
                </AccordionItem>
                <AccordionItem value="lunch">
                    <AccordionTrigger>Lunch</AccordionTrigger>
                        <AccordionContent>
                            Lunch Content
                        </AccordionContent>
                </AccordionItem>
                <AccordionItem value="dinner">
                    <AccordionTrigger>Dinner</AccordionTrigger>
                        <AccordionContent>
                            Dinner Content
                        </AccordionContent>
                </AccordionItem>
                <AccordionItem value="snacks">
                    <AccordionTrigger>Snacks</AccordionTrigger>
                        <AccordionContent>
                            Snacks Content
                        </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
};
export default NutritionTracker;