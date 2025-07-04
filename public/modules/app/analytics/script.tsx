//
//  GOOGLE
//

// GOOGLE -> ANALYTICS
declare global {
    interface Window {
        dataLayer: any[];
    }
}
window.dataLayer = window.dataLayer || [];
function gtag(...args: any[]) {
    window.dataLayer.push(args);
}
gtag('js', new Date());
gtag('config', 'G-LH00FG46KE');