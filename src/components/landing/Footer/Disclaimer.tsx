const Disclaimer: React.FC = () => (
  <div className="mt-12 border-t border-gray-800 dark:border-gray-100 pt-6">
    <div className="text-center sm:flex sm:justify-between sm:text-left">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Made by Milán Herke, a fellow F1 fan. <br />
        The creator of this website is in no way, shape or form linked to FORMULA 1, Liberty Media,
        the FIA or any other organization. This website was created only for fun, and educational
        purposes and it does not generate any revenue. All rights belong to their respective owners.
        Data provided by{" "}
        <a href="https://theoehrly.github.io/Fast-F1/" target="_blank" className="underline">
          FastF1
        </a>
        .
      </p>
    </div>
  </div>
);

export default Disclaimer;
