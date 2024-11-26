import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import rocket from '../assets/icons/icons8-rocket.svg';
import open from '../assets/icons/icons8-open-50.svg';
// import click from '../assets/icons/icons8-webpage-click.svg';

function Cards({ title, content }) {
    return (
        <Card className="w-1/4 h-40 p-4 max-md:w-5/6">
            <div className="flex items-center justify-between h-8 mb-7">
            <CardHeader>
                <CardTitle className="font-light text-xl">{title}</CardTitle>
            </CardHeader>
            <img src={open} alt="open icon" className="w-9" />
            </div>
            <CardContent>
            <p className="text-5xl">{content}</p>
            </CardContent>
      </Card>
    );
  }
  
  export default Cards;