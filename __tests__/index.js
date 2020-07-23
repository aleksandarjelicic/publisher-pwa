import Preact from 'preact'
import { render } from '@testing-library/preact'
import Index from '../pages/index'

describe("ErrorLog/ErrorLog", () => {
  it("renders correctly", () => {
    const { container } = render(<Index />);

    expect(container.firstChild).toMatchSnapshot();
  })
})