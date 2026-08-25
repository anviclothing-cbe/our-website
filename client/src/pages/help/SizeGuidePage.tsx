import { HelpLayout } from "@/components/help/HelpLayout";
import { SIZE_GUIDE_DATA } from "@/lib/support-data";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

import { useSEO } from "@/hooks/useSEO"

export default function SizeGuidePage() {
  useSEO({
    title: "Size Guide | ANVI Clothing",
    description: "Find the perfect fit with our comprehensive size guide for women's ethnic wear, kidswear, and maternity wear.",
    canonical: "https://anvi.clothing/help/size-guide"
  });
  return (
    <HelpLayout 
      title="Size Guide"
      breadcrumbs={[{ label: "Size Guide" }]}
    >
      <div className="space-y-12">
        <p className="text-xl text-text-muted font-light">
          {SIZE_GUIDE_DATA.summary}
        </p>

        <section>
          <h2 className="font-serif text-2xl text-text-primary mb-6">How to Measure</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {SIZE_GUIDE_DATA.howToMeasure.map((item, idx) => (
              <div key={idx} className="bg-surface-light p-6 rounded-sm border border-border-subtle">
                <h3 className="font-serif text-lg text-text-primary mb-2">{item.title}</h3>
                <p className="text-sm text-text-muted">{item.instruction}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-text-primary mb-6">Standard Size Chart</h2>
          <div className="rounded-sm border border-border-subtle overflow-hidden">
            <Table>
              <TableHeader className="bg-surface-light">
                <TableRow className="border-border-subtle hover:bg-surface-light">
                  {SIZE_GUIDE_DATA.chart.headers.map((header, idx) => (
                    <TableHead key={idx} className="text-text-primary font-semibold">
                      {header}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {SIZE_GUIDE_DATA.chart.rows.map((row, idx) => (
                  <TableRow key={idx} className="border-border-subtle hover:bg-border-subtle">
                    {row.map((cell, cellIdx) => (
                      <TableCell key={cellIdx} className={cellIdx === 0 ? "font-medium text-text-primary" : "text-text-muted"}>
                        {cell}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <p className="text-xs text-text-muted mt-4 italic">
            * Note: These are standard body measurements. Actual garment measurements may vary by style and fit.
          </p>
        </section>

        <div className="bg-border-subtle p-6 rounded-sm border border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-serif text-lg text-text-primary mb-1">Still unsure about your size?</h3>
            <p className="text-sm text-text-muted">Our stylists are happy to help you find the perfect fit.</p>
          </div>
          <Button asChild>
            <a href="https://wa.me/919442282319" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat with ANVI
            </a>
          </Button>
        </div>
      </div>
    </HelpLayout>
  );
}
