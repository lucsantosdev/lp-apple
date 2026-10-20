import { footerLinks } from '../constants'

export default function Footer() {
  return (
    <footer className="py-5 sm:px-10 px-5">
        <div className="screen-max-width">
            <div>
                <p className="font-semibold text-gray text-xs">
                    More ways to shop: {' '}
                    <span className="underline text-blue">
                        Find an Apple Store {' '}
                    </span>
                    or {' '}
                    <span className="underline text-blue">
                        other retailer
                    </span>{' '}
                    near you.
                </p>
                <p className="font-semibold text-gray text-xs">
                    Or call 000800-040-1966
                </p>
            </div>
            <p className="text-gray text-xs mt-5">
                3D model "Apple iPhone 15 Pro Max Black" by{' '}
                <a
                  className="underline text-blue"
                  href="https://sketchfab.com/3d-models/apple-iphone-15-pro-max-black-df17520841214c1792fb8a44c6783ee7"
                  target="_blank"
                  rel="noreferrer"
                >
                    polyman
                </a>
                {' '}licensed under{' '}
                <a
                  className="underline text-blue"
                  href="http://creativecommons.org/licenses/by/4.0/"
                  target="_blank"
                  rel="noreferrer"
                >
                    CC-BY-4.0
                </a>
                . This is a study project and is not affiliated with Apple Inc.
            </p>
            <div className="bg-neutral-700 my-5 w-full h-px" />
            <div className="flex md:flex-row flex-col md:items-center justify-between">
                <p className="font-semibold text-gray text-xs">Copyright © {new Date().getFullYear()} Apple Inc. All rights reserved.</p>
                <div className="flex">
                    {footerLinks.map((link, i) => (
                        <p key={link} className="font-semibold text-gray text-xs">
                            {link}{' '}
                            {i !== footerLinks.length - 1 && <span className="mx-2"> | </span>}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    </footer>
  )
}
