const onButtonClicked = (sectionId) => {
  const pageSections = Array.from(document.getElementsByTagName('section'));
  pageSections.forEach((section) => {
    section.style.display = 'none';
  });
  const currentSection = document.getElementById(sectionId);
  currentSection.style.display = 'block';
};

const handleEllipsisElements = () => {
  const elementsToEllipsis = document.getElementsByClassName('js-ellipsis');
  const elementsToEllipsisArray = Array.from(elementsToEllipsis);

  elementsToEllipsisArray.forEach((e) => {
    const maxLines = 2;
    const textFromAttribute = e.getAttribute('data-text');
    const lineHeight = getLineHeight(e);
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
  });
};

addEventListener('resize', handleEllipsisElements);
addEventListener('load', handleEllipsisElements);

const getLineHeight = (element) => {
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

const getTotalVerticalPadding = (element) => {
  const topPadding = window.getComputedStyle(element)['padding-top'];
  const bottomPadding = window.getComputedStyle(element)['padding-bottom'];

  return parseFloat(topPadding) + parseFloat(bottomPadding);
};
