/**
 * cdtProject Component 1.0
 * Author: Ulises Vélez Saldaña.
 * Date: 19-Agosto-2011
 */

// #ifndef cdt_PROJECT
// #def    cdt_PROJECT
if( !cdt ){
	
	// package cdt;
	var cdt = new Object();
	
	// ===================================================
	// class Imgs{
	cdt.Imgs = new Object();
	
	// public static final String PATH = "images/project/"
	cdt.Imgs.PATH = "images/project/";
	
	// public static enum List={BLANK, COLAPSE, ELE, EXPAND, VERT, VERTTda}
	cdt.Imgs.LINE = {
		img: new Image(),
		alt: "    "
	};

	// public static enum List={BLANK, COLAPSE, ELE, EXPAND, VERT, VERTTda}
	cdt.Imgs.BLANK = {
		img: new Image(),
		alt: "----"
	};
	
	cdt.Imgs.COLAPSE = {
		img: new Image(),
		alt: "[-]-"
	};
	cdt.Imgs.ELE = {
		img: new Image(),
		alt: "|---"
	};
	cdt.Imgs.EXPAND = {
		img: new Image(),
		alt: "[+]-"
	};
	cdt.Imgs.VERT = {
		img: new Image(),
		alt: " | "
	};
	cdt.Imgs.VERTT = {
		img: new Image(),
		alt: " | -"
	};
	cdt.Imgs.BLANK.img.src = cdt.Imgs.PATH + "blank.png";	cdt.Imgs.LINE.img.src = cdt.Imgs.PATH + "line.png";	cdt.Imgs.COLAPSE.img.src = cdt.Imgs.PATH + "colapse.png";	cdt.Imgs.ELE.img.src = cdt.Imgs.PATH + "ele.png";	cdt.Imgs.EXPAND.img.src = cdt.Imgs.PATH + "expand.png";	cdt.Imgs.VERT.img.src = cdt.Imgs.PATH + "vert.png";	cdt.Imgs.VERTT.img.src = cdt.Imgs.PATH + "vertt.png";
	
	cdt.Imgs.createImg = function(imagen){
		var imgE = document.createElement("img");
		imgE.src = imagen.img.src;
		imgE.alt = imagen.alt;
		return imgE;
	}
	// } <-- class Imgs
	

	cdt.Calendar = function(){	
		this.formatDate = function(fecha){
			// DD/MM/YYYY
			return ((fecha.getDate()<10)? "0":"") + fecha.getDate() + "/" +
				((fecha.getMonth()<9)? "0":"") + (fecha.getMonth()+1) + "/" +
				fecha.getFullYear();
		}
		
		this.calcDiasMes = function(fecha){
			var f = new Date(fecha);
			f.setDate(28);
			var mes = f.getMonth();
			for( var i=29; mes == f.getMonth(); i++){
				f.setDate(i);
			}
			return i-2;
		}
	}
	// ===================================================
	// public class cdtLogger{
	cdt.Logger = function(){
		// public String[] registro;
		this.registro = new Array();
		
		// public void add(String msg);
		this.add = function(msg){
			this.registro.push(new Date() + ": " + msg);
		}
		
		// public String toString();
		this.toString = function(){
			return this.registro.toString();	
		}
		// public void printDiv(String divId)
		this.printDiv = function(divId){
			var divE = document.getElementById(divId);
			divE.innerHTML = this.registro.join("<br />");
		}			
	}// }<-- class Logger
	
	cdt.logg = new cdt.Logger();

	cdt.Escala = {
		MESES: {TITLE: "meses", WIDTH: 60},
		DIAS: {TITLE: "dias", WIDTH: 30}, 
		SEMANAS: {TITLE: "semanas", WIDTH: 50}
	};

	// ===================================================
	// public  class Project{
	cdt.Project = function (nombre, escala, fchInicio, fchFin){
		
		// public Logger log;
		this.logg = new cdt.Logger();
		
		this.nombre = (nombre)?nombre: "";

		// public Escala escala = Escala.dias;		
		this.escala = (escala)? escala: cdt.Escala.MESES;
		
		// public Date fchInicio = hoy;
		this.fchInicio = (fchInicio)? fchInicio: new Date();
		
		// public Date fchInicio = hoy + 1 mes;
		this.fchFin = (fchFin)? fchFin: (new Date())+ 1000*60*60*24*30;
		
		this.getInicio = function(){
			return cdt.calendar.formatDate(this.fchInicio);
		}
		
		this.getFin = function(){
			return cdt.calendar.formatDate(this.fchFin);
		}
		// public Task[] taskList;
		this.taskList = new Array();

		// public Task getTask(int id)
		this.getTask = function(id){
			for(var i=0; i < this.taskList.length(); i++){
				if( this.taskList[i].id == id ){
					return this.taskList[i];
				}else{
					var task = this.taskList[i].getTask(id);
					if(task != null){
						return task;
					}
				}
			}
			return null;
		}
		
		// public void addTask(Task tsk, int pos)
		this.addTask = function(tsk, pos){
			if( !pos || pos == -1 || pos > this.taskList.length()){
				this.taskList.push(tsk); // TODO: insertar en la poiscion especificada
			} else {
				// TODO: insertar en el lugar correspondiente con base en la fecha de inicio.
				//var pos=
				//for(var i=0; i<taskList.length; i++){	
				this.taskList.splice(pos, 0, tsk); 
			}
		}
	}//}<-- Project.
	
	cdt.Estado = {
		INDEFINIDA: "indefinida", 
		ATRASADA : "atrasada", 
		CERRADA: "cerrada", 
		CANCELADA: "cancelada", 
		DESACTUALIZADA: "desactualizada", 
		EN_TIEMPO: "enTiempo"
	};

	// ===================================================
	// public class Task{
	cdt.Task = function (id, nombre, responsable, avance, edo, alerta, inicio, fin){
		/**
		 * Task(int id, String nombre, String responsable, float avance, Estado edo, String alerta, Date inicio, Date fin)
		 * id: Identificador a usar cuando la tarea está seleccionada.
		 * nombre: Nombre de la tarea.
		 * responsable: Nombre del responsable de la tarea.
		 * avance: Avance de la tarea, valor numérico entre 0.0 y 100.0.
		 * estado: Estado de l atarea: EN_TIEMPO, ATRASADA, 
		 *         DESACTUALIZADA, CANCELADA, CERRRADA.
		 * alerta: Descrpción textual de una alerta sobre la tarea.
		 * inicio: Fecha de inicio.
		 * fin: Fecha en la que termina la tarea.
		 */
		
		this.hijos = new Array();
				
		this.id = id;

		this.nombre = nombre;
		
		this.responsable = responsable;
		
		this.inicio = (inicio)? inicio : (new Date())-(new Date());
		
		this.fin = (fin)? fin : new Date(0);
		
		this.avance = (avance)? avance: 0
		
		this.estado = (edo)? edo: cdt.Estado.INDEFINIDA;
		
		this.alerta = (alerta)? alerta: null;
		
		this.padre = this;
		
		this.nivel = 0;
		
		this.getId = function(){
			return this.id;
		}
		
		this.getNombre = function(){
			return (this.nombre!="")? this.nombre: "[sin nombre]";
		}
		
		this.getResponsable = function(){
			return this.responsable;
		}
		
		this.getAvance = function(){
			return this.avance;
		}
		
		this.getEstado = function(){
			return this.estado;
		}
		
		this.getAlerta = function(){
			return this.alerta;
		}
		
		this.getInicio = function(){
			return cdt.calendar.formatDate(this.inicio);
		}
		
		this.getFin = function(){
			return cdt.calendar.formatDate(this.fin);
		}
		
		// public Task getTask(int id)
		this.getSubTask = function(id){
			for(var i=0; i< this.hijos.length; i++){
				if( this.hijos[i].id == id ){
					return this.hijos[i];
				}else{
					var task = this.hijos[i].getSubTask(id);
					if(task != null){
						return task;
					}
				}
			}
			return null;
		}

		// public addTask(Task tsk, int pos)
		this.addTask = function(tsk, pos){
			if(!pos || pos == -1 || pos > this.hijos.length){
				this.hijos.push(tsk);
			} else {
				this.hijos.splice(pos, 0, tsk);
			}
			tsk.padre = this;
		}
	}// }<-- Task

	// ===================================================
	// public class RenderProject
	cdt.RenderProject = function(){
		this.renderTbl = new cdt.RenderProjectTbl();
		this.renderGantt = new cdt.RenderProjectGantt();
		this.renderGestion = new cdt.RenderProjectGestion();
		
		// public void renderProject(Project prj, divId, view)
		this.renderProject = function(prj, divId, clean){
			var divE = document.getElementById(divId);
			if(clean){
				divE.innerHTLM="";
			}
			if(!divE){
				cdt.logg.add("E: cdt.Render.renderProject(): No se encontró el elemento HTML con Id: " + divId);
			}else{
				divE.className="project";
				divE.appendChild(this.renderTbl.createDiv(prj));
		 		//divE.appendChild(this.renderGestion.createDiv(prj));
		 		divE.appendChild(this.renderGantt.createDiv(prj));
			}
		}
				
		
	}//}<-- RenderProject
	
	// ===================================================
	// public class cdt.RenderProjectTbl{
	cdt.RenderProjectTbl = function(){
		this.cols = new Array("Sel", "Nombre", "Inicio", "Termina", "Avance", "Responsable");
		
		this.createDiv = function(prj){
			
			var div = document.createElement("div");
			div.className="tbl";


			var tbl = document.createElement("table");
			tbl.border=0;
			tbl.cellSpacing=0;
			tbl.cellPadding=0;
			
			for(var t = 0; t < prj.taskList.length; t++){
				this.createTaskRow(tbl, prj.taskList[t]);
			}
			var head = tbl.createTHead().insertRow(-1);
			var cell = head.insertCell(-1);
			cell.appendChild(document.createTextNode(prj.nombre));
			cell.colSpan = this.cols.length;
			cell.style.textAlign="center";
			head = tbl.createTHead().insertRow(-1);
			for(var i=0; i<this.cols.length; i++){
				var cell = head.insertCell(-1);
				cell.appendChild(document.createTextNode(this.cols[i]));
			}

			div.appendChild(tbl);
			return div;
		}
		
		
		// public void createLevelImages(HTMLTableCellElement cell, int level, Array last)
		// Crea las imágenes que anteceden al nombre en la celda para formar el árbol.
		this.createLevelImages = function(divE, tsk, levelLast){
			var pref;
			
			for(var i=0; i<levelLast.length-1; i++){
				if(levelLast[i])
					divE.appendChild(cdt.Imgs.createImg(cdt.Imgs.BLANK));
				else
					divE.appendChild(cdt.Imgs.createImg(cdt.Imgs.VERT));
			}
			if(levelLast.length >= 1){
				if(levelLast[levelLast.length-1]){
					divE.appendChild(cdt.Imgs.createImg(cdt.Imgs.ELE));
				}else{
					divE.appendChild(cdt.Imgs.createImg(cdt.Imgs.VERTT));
				}
			}
			if(tsk.hijos.length > 0){
				divE.appendChild(cdt.Imgs.createImg(cdt.Imgs.COLAPSE));
			}else{
				divE.appendChild(cdt.Imgs.createImg(cdt.Imgs.LINE));
			}
		}

		// public void fillRow(HTMLRowTableElement row, Array levelLast)
		this.createTaskRow = function(tbl, tsk, levelLast){
			var row = tbl.insertRow(-1);
			var cell = row.insertCell(-1);

			if(!levelLast)
				levelLast = new Array();								

			var sel = document.createElement("input");
			sel.type = "radio";
			sel.name = "task";
			sel.value = tsk.getId();
			cell.appendChild(sel);
			
			cell = row.insertCell(-1);
			var divE= document.createElement("div");
			this.createLevelImages(divE, tsk, levelLast);
			divE.appendChild(document.createTextNode(tsk.getNombre()));
			divE.setAttribute("title", tsk.getNombre());
			cell.appendChild(divE);
	
			cell = row.insertCell(-1);
			cell.appendChild(document.createTextNode(tsk.getInicio()));
	
			cell = row.insertCell(-1);
			cell.appendChild(document.createTextNode(tsk.getFin()));
	
			cell = row.insertCell(-1);
			cell.appendChild(document.createTextNode(tsk.getAvance()));
	
			cell = row.insertCell(-1);
			divE= document.createElement("div");
			divE.appendChild(document.createTextNode(tsk.getResponsable()));
			cell.appendChild(divE);
			
			for(var i = 0; i < tsk.hijos.length; i++){
				levelLast.push( (i==tsk.hijos.length-1)?true: false);
				this.createTaskRow( tbl, tsk.hijos[i],  levelLast);	
				levelLast.pop();
			}
		}
	}//}<-- RenderProjectTbl


	// ===================================================
	// public class cdt.Periodo{
	cdt.Periodo = function(prj){
		this.MESES = new Array("Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic");
		
		this.escala = prj.escala;
		
		this.cols = new Array();
		
		this.widths = new Array();

		if(this.escala == cdt.Escala.MESES){
			this.inicMes = new Date(prj.fchInicio.getFullYear(), prj.fchInicio.getMonth(), 1); 
			this.finMes = new Date(
				prj.fchFin.getFullYear(), 
				(prj.fchFin.getMonth()==11)? 0: prj.fchFin.getMonth()+1, 
				01
			);
			this.finMes.setDate(cdt.calendar.calcDiasMes(this.finMes));
			for( var i = new Date(this.inicMes); i.getTime() < this.finMes.getTime(); ){
				this.cols.push(this.MESES[i.getMonth()]+"'"+(i.getFullYear()+"").substring(2,4));
				this.widths.push( (cdt.calendar.calcDiasMes(i)*this.escala.WIDTH)/30 );
				if(i.getMonth() == 11){
					i.setFullYear(i.getFullYear()+1)
					i.setMonth(0);
				}else{
					i.setMonth(i.getMonth()+1);
				}
			}
		}else if(this.escala==cdt.Escala.SEMANAS){
			// TODO:
			alert("TODO: Periodo SEMANAS");
		}else{
			// TODO:
			alert("TODO: Periodo DIAS");
		}
				
		this.calcWidth = function(inic, fin){
			return this.calcLeft(fin)-this.calcLeft(inic);
		}
		
		this.calcLeft = function(inic){
			var leftPx = 0;
			if(this.escala == cdt.Escala.MESES){
				var widthDia = this.escala.WIDTH/30;
				//alert("calcLeft("+inic+"): dias="+( ((inic.getTime()-this.inicMes.getTime())/(1000*60*60*24))+2));
				leftPx = ((this.escala.WIDTH+2)*(inic.getTime()-this.inicMes.getTime())/(1000*60*60*24*30));
				//alert("calcLeft("+inic+"): "+leftPx);
			}
			return leftPx;
		}
	}//}<-- RenderProjectTbl

	// ===================================================
	// public class RenderProjectGantt{
	cdt.RenderProjectGantt = function(){
		

		this.createDiv = function(prj){

			var tbl = document.createElement("table");
			tbl.border=0;
			tbl.cellSpacing=0;
			tbl.cellPadding=0;
			
			var per = new cdt.Periodo(prj);
			// TODO: actualziar conforme a periodo
			
			for(var t = 0; t < prj.taskList.length; t++){
				this.createGanttRow(tbl, prj.taskList[t], per);
			}

			var head = tbl.createTHead().insertRow(-1);
			var cell = head.insertCell(-1);

			var div = document.createElement("div");
			div.appendChild(document.createTextNode(prj.getInicio()+" - "+prj.getFin()))
			cell.appendChild(div);
			cell.colSpan = per.cols.length;
			cell.style.textAlign="center";
			cell.className="periodo";

			head = tbl.createTHead().insertRow(-1);
			for(var i=0; i<per.cols.length; i++){
				cell = head.insertCell(-1);
				div = document.createElement("div");
				div.style.maxWidth = (per.widths[i]-4)+"px";
				div.style.width = (per.widths[i]-4)+"px";
				div.appendChild(document.createTextNode(per.cols[i]))
				cell.appendChild(div);
			}
			
			div = document.createElement("div");
			div.className="gantt";
			div.appendChild(tbl);
			return div;
		}
		

		this.createGanttRow = function(tbl, tsk, per){
			// TODO: 	
			var row = tbl.insertRow(-1);
			var cell = row.insertCell(-1);
			var divT = document.createElement("div");
			var divAv = document.createElement("div");
			
			cell.colSpan = per.cols.length;
			//cell.style.outline="1px solid red";
			cell.style.padding="0px";
			divT.className = ((tsk.hijos.length>0)? "grupo" : "tarea")+" "+tsk.estado;
			divT.style.width = per.calcWidth(tsk.inicio, tsk.fin)+"px";
			divT.style.left = per.calcLeft(tsk.inicio)+"px";
			
			divAv.className = "avance";
			divAv.style.width = ((per.calcWidth(tsk.inicio, tsk.fin)*tsk.avance)/100)+"px";
			
			divT.appendChild(divAv);
			
			var span = document.createElement("span");
			span.className="hoy";
			span.style.left = per.calcLeft(new Date())+"px";

			cell.appendChild(span);
			cell.appendChild(divT);

			
			for(var i=0; i<tsk.hijos.length; i++)
				this.createGanttRow(tbl, tsk.hijos[i], per);
				
/*				<td class="ganttCell">
					<span class="hoy"></span>
					<div class="grupo atrasada" style="width:200px; left:0px">
						<div class="avance" style="width:143px"></div>
					</div>
				</td>*/
			
		}
	}//}<-- cdt.RenderProjectGantt	
	
	
	// ===================================================
	// public class RenderProjectGestion{
	cdt.RenderProjectGestion = function(){	
		this.createDiv = function(prj){
			// TODO:	
			return document.createElement("div");
		}
	}

	cdt.calendar = new cdt.Calendar();
	cdt.render = new cdt.RenderProject();
}



