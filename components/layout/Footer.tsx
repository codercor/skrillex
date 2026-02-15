"use client"

import Link from "next/link"
import Image from "next/image"
import {
    Shield,
    FileCheck,
    Scale,
    Building2,
    Mail,
    Phone,
    MapPin,
    ExternalLink,
    Globe,
} from "lucide-react"
import { Separator } from "@/components/ui/separator"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const footerSections = {
    platform: {
        title: "Platform",
        links: [
            { label: "Overview", href: "#" },
            { label: "How It Works", href: "#" },
            { label: "Policy Engine", href: "#" },
            { label: "Audit Trail", href: "#" },
            { label: "Integrations", href: "#" },
            { label: "API Reference", href: "#" },
        ],
    },
    solutions: {
        title: "Solutions",
        links: [
            { label: "For Government", href: "#" },
            { label: "For Enterprise", href: "#" },
            { label: "For Compliance Teams", href: "#" },
            { label: "For Legal", href: "#" },
        ],
    },
    compliance: {
        title: "Compliance",
        links: [
            { label: "SOC 2 Type II", href: "#" },
            { label: "ISO 27001", href: "#" },
            { label: "GDPR", href: "#" },
            { label: "HIPAA", href: "#" },
            { label: "FedRAMP", href: "#" },
        ],
    },
    resources: {
        title: "Resources",
        links: [
            { label: "Documentation", href: "#" },
            { label: "Case Studies", href: "#" },
            { label: "Whitepapers", href: "#" },
            { label: "Blog", href: "#" },
            { label: "Changelog", href: "#" },
        ],
    },
    company: {
        title: "Company",
        links: [
            { label: "About Us", href: "#" },
            { label: "Leadership", href: "#" },
            { label: "Careers", href: "#" },
            { label: "Press", href: "#" },
            { label: "Contact", href: "#" },
        ],
    },
    legal: {
        title: "Legal",
        links: [
            { label: "Terms of Service", href: "#" },
            { label: "Privacy Policy", href: "#" },
            { label: "Cookie Policy", href: "#" },
            { label: "Data Processing Agreement", href: "#" },
            { label: "Accessibility", href: "#" },
        ],
    },
}

const certifications = [
    { label: "SOC 2 Type II Certified", icon: Shield },
    { label: "ISO 27001 Certified", icon: FileCheck },
    { label: "GDPR Compliant", icon: Scale },
    { label: "FedRAMP Authorized", icon: Building2 },
]

function FooterColumn({
    title,
    links,
}: {
    title: string
    links: { label: string; href: string }[]
}) {
    return (
        <div>
            <h3 className="text-xs font-semibold text-foreground mb-4 uppercase tracking-wider border-b border-border pb-2">
                {title}
            </h3>
            <ul className="space-y-2">
                {links.map((link) => (
                    <li key={link.label}>
                        <Link
                            href={link.href}
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

function MobileAccordion() {
    return (
        <Accordion type="multiple" className="w-full lg:hidden">
            {Object.entries(footerSections).map(([key, section]) => (
                <AccordionItem key={key} value={key} className="border-border">
                    <AccordionTrigger className="text-xs font-semibold text-foreground uppercase tracking-wider hover:no-underline py-3">
                        {section.title}
                    </AccordionTrigger>
                    <AccordionContent>
                        <ul className="space-y-2 pb-2">
                            {section.links.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    )
}

export function Footer() {
    return (
        <footer className="bg-muted/40">
            {/* Official identifier bar */}
            <div className="bg-foreground text-background">
                <div className="mx-auto max-w-7xl px-6 py-2">
                    <p className="text-xs tracking-wide">
                        An official website of Baselex, Inc. — Trusted by government and enterprise
                    </p>
                </div>
            </div>

            {/* Main footer content */}
            <div className="mx-auto max-w-7xl px-6">
                {/* Top section */}
                <div className="py-12 lg:py-14">
                    <div className="flex flex-col lg:flex-row lg:justify-between gap-10">
                        {/* Logo and description */}
                        <div className="max-w-md">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="flex items-center justify-center w-40 h-10">
                                    <img src="/logo-h-text.svg" alt="BaseLex" className='w-full h-full object-contain' />
                                </div>

                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                                The agentic platform that scales with you. Design, fuel, and operationalize
                                systems that learn and adapt on an open cloud platform.
                            </p>

                            {/* Certifications */}
                            <div className="flex flex-wrap gap-2">
                                {certifications.map((cert) => (
                                    <div
                                        key={cert.label}
                                        className="inline-flex items-center gap-2 px-3 py-2 bg-background border border-border text-xs text-muted-foreground"
                                    >
                                        <cert.icon className="w-4 h-4 text-[#5046e5]" />
                                        <span>{cert.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Contact */}
                        <div className="lg:text-right">
                            <h3 className="text-xs font-semibold text-foreground mb-4 uppercase tracking-wider">
                                Contact
                            </h3>
                            <div className="space-y-2">
                                <a
                                    href="mailto:contact@baselex.io"
                                    className="flex items-center gap-2 lg:justify-end text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    <Mail className="w-4 h-4" />
                                    contact@baselex.io
                                </a>
                                <div className="flex items-center gap-2 lg:justify-end text-sm text-muted-foreground">
                                    <Phone className="w-4 h-4" />
                                    <span>+1 (555) 000-0000</span>
                                </div>
                                <div className="flex items-center gap-2 lg:justify-end text-sm text-muted-foreground">
                                    <MapPin className="w-4 h-4" />
                                    <span>Basel, Switzerland</span>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center gap-4 lg:justify-end">
                                <Link
                                    href="#"
                                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    <Shield className="w-4 h-4" />
                                    Trust Center
                                    <ExternalLink className="w-3 h-3" />
                                </Link>
                                <span className="text-border">|</span>
                                <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                                    Status
                                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <Separator />

                {/* Navigation columns */}
                <div className="py-12 lg:py-14">
                    <div className="hidden lg:grid lg:grid-cols-6 gap-8">
                        {Object.entries(footerSections).map(([key, section]) => (
                            <FooterColumn key={key} {...section} />
                        ))}
                    </div>
                    <MobileAccordion />
                </div>

                <Separator />

                {/* Bottom bar */}
                <div className="py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-muted-foreground">
                            © 2026 Baselex, Inc. All rights reserved.
                        </p>

                        <div className="flex items-center gap-6">
                            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                Terms
                            </Link>
                            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                Privacy
                            </Link>
                            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                Cookies
                            </Link>
                            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                Accessibility
                            </Link>
                        </div>

                        <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4 text-muted-foreground" />
                            <Select defaultValue="en">
                                <SelectTrigger className="w-[120px] h-8 text-sm border-border bg-background" aria-label="Select language">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="en">English</SelectItem>
                                    <SelectItem value="de">Deutsch</SelectItem>
                                    <SelectItem value="fr">Français</SelectItem>
                                    <SelectItem value="es">Español</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
