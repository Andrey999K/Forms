import { fetchAllResponses } from '@/redux/response/responseSlice';
import { AppDispatch } from '@/redux/store';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Loader } from '@/components/ui/Loader';
import { FormResponse } from '@/types';

ChartJS.register(ArcElement, Tooltip, Legend);

type PieChartData = {
  labels: string[];
  counts: number[];
  question: string;
  datasets: {
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
};

export const AnalyticsResponses = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { formId } = useParams<{ formId: string }>();
  const [pieData, setPieData] = useState<any>({});

  useEffect(() => {
    dispatch(
      fetchAllResponses({
        reference: { collectionName: 'form', id: formId ?? '', key: 'formId' },
      })
    )
      .unwrap()
      .then((res) => {
        const transformedData = transformDataToPie(res.data);
        setPieData(transformedData);
      });
  }, [dispatch, formId]);

  const transformDataToPie = (responses: FormResponse[]) => {
    const questionPieData: {
      [id: string]: PieChartData;
    } = {};

    responses.forEach((response) => {
      response.fields.forEach((field) => {
        const { question, id, answer } = field;

        if (!questionPieData[id]) {
          questionPieData[id] = { labels: [], counts: [], question, datasets: [] };
        }

        if (Array.isArray(answer)) {
          answer.forEach((answerItem: string) => {
            const questionData = questionPieData[id];
            const index = questionData.labels.indexOf(answerItem);

            if (index !== -1) {
              questionData.counts[index] += 1;
            } else {
              questionData.labels.push(answerItem);
              questionData.counts.push(1);
            }
          });
        } else {
          const questionData = questionPieData[id];
          const index = questionData.labels.indexOf(answer);

          if (index !== -1) {
            questionData.counts[index] += 1;
          } else {
            questionData.labels.push(answer);
            questionData.counts.push(1);
          }
        }
      });
    });

    const pieCharts = Object.keys(questionPieData).reduce(
      (acc: { [id: string]: PieChartData }, id) => {
        const { labels, counts, question } = questionPieData[id];
        acc[id] = {
          labels,
          counts,
          question,
          datasets: [
            {
              data: counts,
              backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
          ],
        };
        return acc;
      },
      {}
    );

    return pieCharts;
  };

  if (Object.keys(pieData).length === 0) return <Loader />;

  return (
    <div className="grid md:grid-cols-2 gap-20">
      {Object.keys(pieData).map((id) => (
        <div key={id}>
          <h4>{pieData[id].question}</h4>
          <Pie data={pieData[id]} />
        </div>
      ))}
    </div>
  );
};
