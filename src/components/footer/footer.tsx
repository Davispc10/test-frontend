import { socialMedia } from '@/config/social-media'

export const Footer = () => {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          {socialMedia.map((item) => (
            <a
              key={item.name}
              href={item.href}
              data-testid={item.name}
              target="_blank"
              className="text-muted-foreground hover:text-accent-foreground"
              rel="noreferrer"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </a>
          ))}
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-xs leading-5 text-muted-foreground">
            &copy; 2024 Yuri Rodrigues, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
