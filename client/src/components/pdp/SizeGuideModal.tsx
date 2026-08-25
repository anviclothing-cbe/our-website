import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ContextualSupport } from "@/components/shared/ContextualSupport"

interface SizeGuideModalProps {
  children: React.ReactNode
}

export function SizeGuideModal({ children }: SizeGuideModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] p-6 bg-surface border-border-subtle rounded-none">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl text-text-primary mb-4">Size Guide</DialogTitle>
        </DialogHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="border-b border-border-subtle">
                <th className="py-3 px-2 font-medium text-text-primary">Size</th>
                <th className="py-3 px-2 font-medium text-text-primary">UK/AU</th>
                <th className="py-3 px-2 font-medium text-text-primary">US</th>
                <th className="py-3 px-2 font-medium text-text-primary">Bust (in)</th>
                <th className="py-3 px-2 font-medium text-text-primary">Waist (in)</th>
                <th className="py-3 px-2 font-medium text-text-primary">Hip (in)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle text-text-muted">
              <tr>
                <td className="py-3 px-2 font-medium">XS</td>
                <td className="py-3 px-2">6</td>
                <td className="py-3 px-2">2</td>
                <td className="py-3 px-2">32</td>
                <td className="py-3 px-2">26</td>
                <td className="py-3 px-2">36</td>
              </tr>
              <tr>
                <td className="py-3 px-2 font-medium">S</td>
                <td className="py-3 px-2">8</td>
                <td className="py-3 px-2">4</td>
                <td className="py-3 px-2">34</td>
                <td className="py-3 px-2">28</td>
                <td className="py-3 px-2">38</td>
              </tr>
              <tr>
                <td className="py-3 px-2 font-medium">M</td>
                <td className="py-3 px-2">10</td>
                <td className="py-3 px-2">6</td>
                <td className="py-3 px-2">36</td>
                <td className="py-3 px-2">30</td>
                <td className="py-3 px-2">40</td>
              </tr>
              <tr>
                <td className="py-3 px-2 font-medium">L</td>
                <td className="py-3 px-2">12</td>
                <td className="py-3 px-2">8</td>
                <td className="py-3 px-2">38</td>
                <td className="py-3 px-2">32</td>
                <td className="py-3 px-2">42</td>
              </tr>
              <tr>
                <td className="py-3 px-2 font-medium">XL</td>
                <td className="py-3 px-2">14</td>
                <td className="py-3 px-2">10</td>
                <td className="py-3 px-2">40</td>
                <td className="py-3 px-2">34</td>
                <td className="py-3 px-2">44</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-6 pt-6 border-t border-border-subtle">
          <h4 className="font-medium text-text-primary mb-2 text-sm">How to measure</h4>
          <ul className="text-sm text-text-muted space-y-2 list-disc pl-4 mb-6">
            <li><strong>Bust:</strong> Measure under your arms, around the fullest part of your chest.</li>
            <li><strong>Waist:</strong> Measure around your natural waistline, keeping the tape a bit loose.</li>
            <li><strong>Hip:</strong> Measure around the fullest part of your body at the top of your leg.</li>
          </ul>
          
          <ContextualSupport 
            title="Still not sure about your size?"
            ctaText="Chat with us"
            params={{ context: "sizingHelp" }}
            className="bg-surface-light border border-border-subtle p-4"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
