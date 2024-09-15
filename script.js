function onButtonClicked(sectionId) {
  const pageSections = document.getElementsByTagName('section');

  for(let i = 0 ; i < pageSections.length; i++) {
    const section = pageSections[i];
    section.style.display = 'none';
  }

  const currentSection = document.getElementById(sectionId);
  currentSection.style.display = 'block';
};

function handleEllipsisElements() {
  const elementsToEllipsis = document.getElementsByClassName('js-ellipsis');

  for(let i = 0 ; i < elementsToEllipsis.length; i++) {
    const e = elementsToEllipsis[i]
    const maxLines = 2;
    const textFromAttribute = e.getAttribute('data-text');
    const lineHeight = getLineHeight(e);
    console.log(lineHeight)
    const totalPadding = getTotalVerticalPadding(e);

    let truncateText = '';
    if (textFromAttribute) {
      truncateText = textFromAttribute;
    } else {
      truncateText = e.textContent;
      e.setAttribute('data-text', truncateText);
    }
    const truncateTextParts = truncateText.split(' ');

    e.innerHTML = truncateText;
    const calculatedHeight = totalPadding + maxLines * lineHeight;
    while (e.clientHeight > calculatedHeight) {
      truncateTextParts.pop();
      e.innerHTML = truncateTextParts.join(' ') + '...';
    }
  }
};

function getLineHeight(element) {
  const lineHeight = window.getComputedStyle(element)['line-height'];
  if (lineHeight === 'normal') {
    const normalLineHeightMultiplaier = 1.5;
    return (
      normalLineHeightMultiplaier *
      parseFloat(window.getComputedStyle(element)['font-size'])
    );
  } else {
    return parseFloat(lineHeight);
  }
};

function getTotalVerticalPadding(element) {
  const topPadding = window.getComputedStyle(element)['padding-top'];
  const bottomPadding = window.getComputedStyle(element)['padding-bottom'];

  return parseFloat(topPadding) + parseFloat(bottomPadding);
};

addEventListener('resize', handleEllipsisElements);
addEventListener('load', handleEllipsisElements);
