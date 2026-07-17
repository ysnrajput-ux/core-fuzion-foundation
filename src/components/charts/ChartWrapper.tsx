/**
 * Central chart wrappers around Chart.js. Register components once here so
 * feature charts don't repeat the boilerplate.
 */
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
  type ChartOptions,
} from "chart.js";
import { Bar, Line, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
);

const defaults: ChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: "bottom", labels: { boxWidth: 10, boxHeight: 10 } },
  },
};

export { Bar as BarChart, Line as LineChart, Doughnut as DoughnutChart, defaults as chartDefaults };
