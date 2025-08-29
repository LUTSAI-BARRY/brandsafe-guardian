import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqData } from "@/lib/data";

export function FAQSection() {
  return (
    <section id="faq" className="py-20 bg-muted">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-muted-foreground mb-2">FAQ</p>
          <h2 className="text-3xl font-bold mb-4" data-testid="text-faq-title">
            Frequently asked questions
          </h2>
        </div>
        
        <Accordion type="single" collapsible className="space-y-4">
          {faqData.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-card border border-border rounded-lg px-6"
              data-testid={`faq-item-${index}`}
            >
              <AccordionTrigger className="text-left hover:no-underline py-4" data-testid={`faq-question-${index}`}>
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-muted-foreground" data-testid={`faq-answer-${index}`}>
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
