import iconHTML from '@/assets/images/icon-html.svg';
import iconJS from '@/assets/images/icon-js.svg';
import iconCSS from '@/assets/images/icon-css.svg';
import iconAccessibility from '@/assets/images/icon-accessibility.svg';

export function topicIcon(topic: string | undefined) {
    let src;
    let bgColor;

    if (topic === 'HTML') {
        src = iconHTML;
        bgColor = '#fff1e9'
    } else if (topic === 'CSS') {
        src = iconCSS;
        bgColor = '#e0fdef';
    } else if (topic === 'JavaScript') {
        src = iconJS;
        bgColor = '#ebf0ff';
    } else if (topic === 'Accessibility') {
        src = iconAccessibility;
        bgColor = '#f6e7ff';
    }

    return { src, bgColor }
}