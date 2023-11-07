export default class Collapsible {
  constructor(element, animatedElement, counter) {
    this.element = element;
    this.animatedElement = animatedElement;
    this.counter = counter;

    this.collapseElement = this.collapseElement.bind(this);
    this.element.addEventListener('click', this.collapseElement);
  }

  collapseElement(e) {
    e.preventDefault();
    this.counter += 1;
    console.log(this.counter);
    if (this.counter % 2 > 0) {
      if (this.animatedElement.classList.contains('collapse-animation-reverse')) {
        this.animatedElement.classList.remove('collapse-animation-reverse');
      }
      this.animatedElement.classList.add('collapse-animation');
    } else {
      this.animatedElement.classList.toggle('collapse-animation');
      this.animatedElement.classList.add('collapse-animation-reverse');
    }
  }
}
